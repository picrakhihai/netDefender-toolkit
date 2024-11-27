# scanner/views.py
from django.shortcuts import render
from django.http import JsonResponse
import subprocess
import pyshark
import simplekml
import os
from datetime import datetime

# Import the set_permissions function
from .utils.set_permissions import set_permissions

def index(request):
    return render(request, 'scanner/index.html')

def capture_packet(request):
    # Generate unique file names with timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    pcap_file = f'captures/capture_{timestamp}.pcap'
    kml_file = f'captures/output_{timestamp}.kml'

    # Ensure the captures directory exists
    os.makedirs('captures', exist_ok=True)

    # Run tshark to capture packets and save to .pcap
    try:
        subprocess.run(['tshark', '-i', 'eno1', '-a', 'duration:10', '-w', pcap_file], check=True)
    except subprocess.CalledProcessError as e:
        return JsonResponse({'error': 'Error during packet capture', 'details': str(e)}, status=500)

    # Process .pcap file and generate .kml
    try:
        cap = pyshark.FileCapture(pcap_file)
        kml = simplekml.Kml()

        for pkt in cap:
            if hasattr(pkt, 'ip'):
                src = getattr(pkt.ip, 'src', None)
                dst = getattr(pkt.ip, 'dst', None)
                if src and dst:
                    kml.newpoint(name="Connection", coords=[(src, dst)])

        kml.save(kml_file)

    except Exception as e:
        return JsonResponse({'error': 'Error during KML generation', 'details': str(e)}, status=500)

    # Set permissions after generating files
    set_permissions('captures')

    # Return a success response with file paths
    return JsonResponse({
        'message': 'Packet capture and KML generation successful',
        'pcap_file': pcap_file,
        'kml_file': kml_file
    })
