"""Infrastructure exposure detection — Kubernetes, Docker, Jenkins, Elasticsearch, etc."""
import asyncio
import httpx
from utils.logger import logger

INFRA_SERVICES = [
    {
        "name": "Kubernetes API Server",
        "port": 6443,
        "path": "/api/v1",
        "risk": "Critical",
        "note": "Kubernetes API server exposed — potential cluster takeover",
        "remediation": "Restrict Kubernetes API to internal network only. Use RBAC.",
    },
    {
        "name": "Kubernetes Kubelet",
        "port": 10250,
        "path": "/pods",
        "risk": "Critical",
        "note": "Kubelet API exposed — allows pod listing and potential container escape",
        "remediation": "Restrict kubelet API access. Enable authentication.",
    },
    {
        "name": "Kubernetes Dashboard",
        "port": 8001,
        "path": "/api/v1/namespaces",
        "risk": "Critical",
        "note": "Kubernetes dashboard may be accessible without authentication",
        "remediation": "Disable public dashboard access. Require authentication.",
    },
    {
        "name": "Docker Registry",
        "port": 5000,
        "path": "/v2/",
        "risk": "High",
        "note": "Unauthenticated Docker registry — private images may be accessible",
        "remediation": "Enable Docker registry authentication. Restrict network access.",
    },
    {
        "name": "Jenkins CI",
        "port": 8080,
        "path": "/login",
        "risk": "High",
        "note": "Jenkins CI/CD server accessible — may expose build secrets and code",
        "remediation": "Enable Jenkins authentication. Restrict to internal network.",
    },
    {
        "name": "Elasticsearch",
        "port": 9200,
        "path": "/_cat/indices",
        "risk": "Critical",
        "note": "Elasticsearch node exposed — database contents potentially accessible",
        "remediation": "Enable Elasticsearch security (X-Pack). Firewall the port.",
    },
    {
        "name": "Kibana",
        "port": 5601,
        "path": "/api/status",
        "risk": "High",
        "note": "Kibana dashboard exposed — log data and monitoring visible",
        "remediation": "Enable Kibana authentication. Restrict access to internal network.",
    },
    {
        "name": "Redis",
        "port": 6379,
        "path": None,
        "risk": "Critical",
        "note": "Redis cache server exposed — unauthenticated access may allow data theft",
        "remediation": "Enable Redis AUTH. Bind to localhost or private network.",
    },
    {
        "name": "RabbitMQ Management",
        "port": 15672,
        "path": "/api/overview",
        "risk": "High",
        "note": "RabbitMQ management console accessible",
        "remediation": "Change default credentials. Restrict management UI to internal network.",
    },
    {
        "name": "Prometheus",
        "port": 9090,
        "path": "/api/v1/label/__name__/values",
        "risk": "Medium",
        "note": "Prometheus metrics exposed — infrastructure details visible",
        "remediation": "Enable Prometheus authentication. Restrict to monitoring network.",
    },
    {
        "name": "Grafana",
        "port": 3000,
        "path": "/api/health",
        "risk": "Medium",
        "note": "Grafana dashboard accessible",
        "remediation": "Enable Grafana authentication. Avoid exposing to public internet.",
    },
    {
        "name": "etcd",
        "port": 2379,
        "path": "/v3/cluster/member/list",
        "risk": "Critical",
        "note": "etcd cluster exposed — Kubernetes secrets may be accessible",
        "remediation": "Enable etcd TLS and client authentication. Restrict to internal network.",
    },
]


async def _check_infra_service(host: str, service: dict, client: httpx.AsyncClient) -> dict | None:
    """Check if an infrastructure service is accessible."""
    port = service["port"]
    path = service.get("path", "/")

    # First check TCP connectivity
    try:
        _, writer = await asyncio.wait_for(
            asyncio.open_connection(host, port), timeout=3.0
        )
        writer.close()
        await writer.wait_closed()
    except (asyncio.TimeoutError, ConnectionRefusedError, OSError):
        return None

    # Port is open — try HTTP if path is provided
    if path:
        for scheme in ["http", "https"]:
            try:
                url = f"{scheme}://{host}:{port}{path}"
                resp = await client.get(url)
                if resp.status_code in (200, 401, 403):
                    accessible = resp.status_code == 200
                    return {
                        **service,
                        "host": host,
                        "url": url,
                        "status_code": resp.status_code,
                        "accessible": accessible,
                        "detected": True,
                        "auth_required": resp.status_code in (401, 403),
                    }
            except Exception:
                continue

    # Port is open but no HTTP response — still flag it
    return {
        **service,
        "host": host,
        "url": f"tcp://{host}:{port}",
        "status_code": None,
        "accessible": None,
        "detected": True,
        "auth_required": None,
    }


async def infra_probe(domain: str) -> dict:
    """Scan for exposed infrastructure services."""
    result = {
        "services_detected": [],
        "critical_exposures": [],
        "issues": [],
        "risk_level": "Low",
    }

    try:
        import socket
        try:
            host = socket.gethostbyname(domain)
        except socket.gaierror:
            return result

        async with httpx.AsyncClient(
            timeout=5, verify=False,
            follow_redirects=False,
            headers={"User-Agent": "ReconShield-Educational/1.0"}
        ) as client:
            tasks = [_check_infra_service(host, svc, client) for svc in INFRA_SERVICES]
            raw_results = await asyncio.gather(*tasks, return_exceptions=True)

        for res in raw_results:
            if res and not isinstance(res, Exception):
                result["services_detected"].append(res)
                if res["risk"] == "Critical" and (res.get("accessible") or res.get("detected")):
                    result["critical_exposures"].append(res)

        # Build issues
        if result["critical_exposures"]:
            names = [s["name"] for s in result["critical_exposures"][:3]]
            result["issues"].append(
                f"Critical infrastructure exposed: {', '.join(names)}"
            )
            result["risk_level"] = "Critical"
        elif result["services_detected"]:
            result["issues"].append(
                f"{len(result['services_detected'])} infrastructure service(s) detected — verify authentication"
            )
            result["risk_level"] = "High"

    except Exception as e:
        logger.error(f"Infrastructure probe failed for {domain}: {e}")

    return result
