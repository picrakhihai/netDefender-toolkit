import os
import subprocess
from django.http import StreamingHttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import render


def index(request):
    return render(request, "nmap/index.html")

@csrf_exempt
def scan(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            scan_type = data.get("scan_type")
            custom_command = data.get("custom_command", "")

            # Determine the command to run
            if scan_type == "basic":
                command = ["nmap", "-sn", "127.0.0.1"]
            elif scan_type == "intermediate":
                command = ["nmap", "--top-ports", "50"]
            elif scan_type == "custom" and custom_command:
                command = custom_command.split()
            else:
                return JsonResponse({"error": "Invalid scan type"}, status=400)

            # Generator to stream output
            def stream_scan():
                process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
                for line in iter(process.stdout.readline, ""):
                    yield line
                process.stdout.close()
                process.wait()

            return StreamingHttpResponse(stream_scan(), content_type="text/plain")

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Invalid request"}, status=400)
