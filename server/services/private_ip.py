import ipaddress
from typing import Dict, List, Optional

class PrivateIPService:
    """Educational service for private IP visualization"""
    
    # Private IP ranges definition
    PRIVATE_RANGES = {
        '192.168.0.0/16': {
            'type': 'Home/SOHO Network',
            'name': 'Class C Private Network',
            'total_addresses': '65,536',
            'typical_use': 'Home routers, small offices, SOHO networks',
            'common_devices': ['Wi-Fi Router', 'Laptops', 'Smartphones', 'Printers', 'Smart TVs', 'IoT Devices'],
            'subnet_mask': '255.255.255.0',
            'cidr': '/24',
            'default_gateway': '192.168.1.1 or 192.168.0.1',
            'color': '#00b8ff'
        },
        '10.0.0.0/8': {
            'type': 'Large Enterprise Network',
            'name': 'Class A Private Network',
            'total_addresses': '16,777,216',
            'typical_use': 'Corporate networks, data centers, universities, large organizations',
            'common_devices': ['Core Switches', 'Servers', 'Workstations', 'VoIP Phones', 'Security Cameras'],
            'subnet_mask': '255.0.0.0',
            'cidr': '/8',
            'default_gateway': '10.0.0.1',
            'color': '#ff8800'
        },
        '172.16.0.0/12': {
            'type': 'Medium Organization Network',
            'name': 'Class B Private Network',
            'total_addresses': '1,048,576',
            'typical_use': 'Medium businesses, campuses, large branch offices',
            'common_devices': ['Routers', 'Switches', 'Workstations', 'Servers', 'Access Points'],
            'subnet_mask': '255.240.0.0',
            'cidr': '/12',
            'default_gateway': '172.16.0.1 or 172.31.255.254',
            'color': '#44ff44'
        },
        '127.0.0.0/8': {
            'type': 'Loopback / Localhost',
            'name': 'Local Machine Network',
            'total_addresses': '16,777,216',
            'typical_use': 'Local development, testing, service binding',
            'common_devices': ['Your Computer Only'],
            'subnet_mask': '255.0.0.0',
            'cidr': '/8',
            'default_gateway': 'N/A (Virtual Interface)',
            'color': '#ff4444'
        },
        '169.254.0.0/16': {
            'type': 'Link-Local (APIPA)',
            'name': 'Automatic Private IP Addressing',
            'total_addresses': '65,536',
            'typical_use': 'DHCP failure fallback, peer-to-peer communication',
            'common_devices': ['Devices when DHCP fails'],
            'subnet_mask': '255.255.0.0',
            'cidr': '/16',
            'default_gateway': 'None (No gateway)',
            'color': '#ffaa00'
        }
    }
    
    @staticmethod
    def is_private_ip(ip: str) -> bool:
        """Check if IP is private/rfc1918"""
        try:
            ip_obj = ipaddress.ip_address(ip)
            return ip_obj.is_private
        except:
            return False
    
    @staticmethod
    def get_private_range(ip: str) -> Optional[str]:
        """Get which private range the IP belongs to"""
        try:
            ip_obj = ipaddress.ip_address(ip)
            for cidr in PrivateIPService.PRIVATE_RANGES.keys():
                if ip_obj in ipaddress.ip_network(cidr):
                    return cidr
        except:
            pass
        return None
    
    @staticmethod
    def get_network_context(ip: str) -> Dict:
        """Get educational network context for private IP"""
        
        if not PrivateIPService.is_private_ip(ip):
            return {
                "is_private": False,
                "message": "This is a public IP address. Use public geolocation APIs."
            }
        
        # Get range information
        cidr = PrivateIPService.get_private_range(ip)
        if cidr and cidr in PrivateIPService.PRIVATE_RANGES:
            range_info = PrivateIPService.PRIVATE_RANGES[cidr].copy()
        else:
            range_info = {
                'type': 'Unknown Private Range',
                'name': 'Custom Private Network',
                'total_addresses': 'Variable',
                'typical_use': 'Custom configured network',
            }
        
        # Calculate network information
        octets = ip.split('.')
        if len(octets) == 4:
            network_base = f"{octets[0]}.{octets[1]}.{octets[2]}"
            gateway = f"{network_base}.1"
            subnet = f"{network_base}.0/24"
            broadcast = f"{network_base}.255"
        else:
            gateway = "Unknown"
            subnet = "Unknown"
            broadcast = "Unknown"
        
        # Generate simulated local devices
        simulated_devices = [
            {"name": "Default Gateway (Router)", "ip": gateway, "type": "router"},
            {"name": "Your Device", "ip": ip, "type": "current", "is_current": True},
            {"name": "Smartphone - John's iPhone", "ip": f"{network_base}.12", "type": "mobile"},
            {"name": "Living Room TV", "ip": f"{network_base}.25", "type": "tv"},
            {"name": "Network Printer", "ip": f"{network_base}.35", "type": "printer"},
            {"name": "Guest Laptop", "ip": f"{network_base}.42", "type": "laptop"},
            {"name": "Smart Speaker", "ip": f"{network_base}.58", "type": "iot"},
            {"name": "Security Camera", "ip": f"{network_base}.67", "type": "camera"},
        ]
        
        return {
            "is_private": True,
            "ip": ip,
            "range_info": range_info,
            "network": {
                "subnet": subnet,
                "gateway": gateway,
                "broadcast": broadcast,
                "subnet_mask": range_info.get('subnet_mask', '255.255.255.0'),
                "cidr": range_info.get('cidr', '/24'),
                "total_usable_hosts": 254
            },
            "simulated_devices": simulated_devices,
            "educational_notes": {
                "why_no_location": "Private IP addresses never route on the public internet, so no global database can map them to physical locations.",
                "how_it_works": "Your router uses Network Address Translation (NAT) to translate this private IP to a public IP when accessing the internet.",
                "security_implication": "Private IPs add a layer of security by hiding internal network structure from the internet."
            }
        }
    
    @staticmethod
    def get_security_recommendations(ip: str) -> List[Dict]:
        """Get security recommendations for private network"""
        
        try:
            octets = ip.split('.')
            if len(octets) < 4:
                return []
            gateway = f"{octets[0]}.{octets[1]}.{octets[2]}.1"
        except:
            return []
        
        return [
            {
                "priority": "HIGH",
                "title": "Change Default Router Password",
                "description": "Most routers use default credentials (admin/admin). Change immediately.",
                "action": f"Access http://{gateway} and update administrator password."
            },
            {
                "priority": "HIGH",
                "title": "Enable WPA3/WPA2 Encryption",
                "description": "Ensure your Wi-Fi is encrypted to prevent eavesdropping.",
                "action": "In router settings, set Wi-Fi encryption to WPA2 or WPA3."
            },
            {
                "priority": "MEDIUM",
                "title": "Disable WPS",
                "description": "Wi-Fi Protected Setup has known vulnerabilities.",
                "action": "Disable WPS in router configuration."
            },
            {
                "priority": "MEDIUM",
                "title": "Update Router Firmware",
                "description": "Router firmware often has security patches.",
                "action": f"Check {gateway} for firmware updates."
            },
            {
                "priority": "LOW",
                "title": "Enable Guest Network",
                "description": "Isolate IoT and guest devices from your main network.",
                "action": "Enable guest network feature in router settings."
            }
        ]
