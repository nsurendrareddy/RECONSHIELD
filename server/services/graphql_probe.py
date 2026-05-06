"""GraphQL endpoint detection and introspection probe."""
import httpx
from utils.logger import logger

GRAPHQL_ENDPOINTS = [
    "/graphql",
    "/graphiql",
    "/graphql/v1",
    "/v1/graphql",
    "/api/graphql",
    "/query",
    "/graph",
    "/gql",
]

INTROSPECTION_QUERY = '{"query":"{ __schema { types { name } } }"}'
SIMPLE_QUERY = '{"query":"{ __typename }"}'


async def graphql_probe(domain: str) -> dict:
    """Detect GraphQL endpoints and test for introspection exposure."""
    result = {
        "endpoints_found": [],
        "introspection_enabled": False,
        "schema_preview": {},
        "issues": [],
        "risk_level": "Low",
    }

    try:
        async with httpx.AsyncClient(
            follow_redirects=True, timeout=10, verify=False,
            headers={"User-Agent": "ReconShield-Educational/1.0"}
        ) as client:
            for path in GRAPHQL_ENDPOINTS:
                url = f"https://{domain}{path}"
                try:
                    # First try a GET request
                    resp = await client.get(url)
                    is_graphql = False

                    # Check if it's a GraphQL endpoint by response
                    if resp.status_code in (200, 400, 405):
                        ct = resp.headers.get("content-type", "")
                        body = resp.text[:2000]
                        if any(indicator in body.lower() for indicator in [
                            "graphql", "__typename", "query", "mutation", "subscription",
                            "graphiql", "playground"
                        ]):
                            is_graphql = True

                    # Try POST introspection
                    try:
                        post_resp = await client.post(
                            url,
                            content=INTROSPECTION_QUERY,
                            headers={"Content-Type": "application/json"},
                        )
                        body = post_resp.text[:5000]
                        if "__schema" in body and "types" in body:
                            is_graphql = True
                            result["introspection_enabled"] = True
                            # Extract type names from schema
                            import json
                            try:
                                data = json.loads(body)
                                types = (
                                    data.get("data", {})
                                    .get("__schema", {})
                                    .get("types", [])
                                )
                                type_names = [
                                    t["name"] for t in types
                                    if t.get("name") and not t["name"].startswith("__")
                                ]
                                result["schema_preview"] = {
                                    "type_count": len(type_names),
                                    "types": type_names[:20],
                                }
                            except Exception:
                                pass
                        elif "errors" in body.lower() or post_resp.status_code == 400:
                            # GraphQL endpoint exists but introspection disabled (good)
                            is_graphql = True
                    except Exception:
                        pass

                    if is_graphql:
                        result["endpoints_found"].append({
                            "url": url,
                            "introspection": result["introspection_enabled"],
                            "status": resp.status_code,
                        })

                except Exception:
                    continue

        if result["introspection_enabled"]:
            result["issues"].append(
                "GraphQL introspection enabled — full schema exposed to attackers. "
                "Disable in production: introspection should be disabled."
            )
            result["risk_level"] = "High"
        elif result["endpoints_found"]:
            result["issues"].append(
                f"GraphQL endpoint detected at {result['endpoints_found'][0]['url']} — "
                "verify authentication is enforced"
            )
            result["risk_level"] = "Medium"

    except Exception as e:
        logger.error(f"GraphQL probe failed for {domain}: {e}")

    return result
