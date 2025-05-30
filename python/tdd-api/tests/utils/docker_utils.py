import os
import time

import docker


scripts_dir = os.path.abspath("./scripts")


def is_container_ready(container):
    container.reload()
    return container.status == "running"


def wait_for_stable_status(container, stable_duration=5, interval=1):
    start_time = time.time()
    stable_count = 0
    while time.time() - start_time < stable_duration:
        if is_container_ready(container):
            stable_count += 1
        else:
            stable_count = 0

        if stable_count >= stable_duration / interval:
            return True

        time.sleep(interval)
    return False


def start_database_container(container_name="test-db", port=5434):
    client = docker.from_env()

    try:
        existing_container = client.containers.get(container_name)
        print(f"Container {container_name} already exists! Stopping & removing it...")
        existing_container.stop()
        existing_container.remove()
        print(f"Container {container_name} stopped & removed!")
    except docker.errors.NotFound:
        print(f"Container {container_name} not found!")
        # Define container configuration
    container_config = {
        "name": container_name,
        "image": "postgres:16.1-alpine3.19",
        "detach": True,
        "ports": {"5432": port},
        "environment": {
            "POSTGRES_USER": "postgres",
            "POSTGRES_PASSWORD": "postgres",
        },
        "volumes": [f"{scripts_dir}:/docker-entrypoint-initdb.d"],
        "network_mode": "fastapi-development_dev-network",
    }

    # Start Container
    container = client.containers.run(**container_config)

    while not is_container_ready(container):
        time.sleep(1)

    if not wait_for_stable_status(container):
        raise RuntimeError("Container did not stabilize within the specified time")

    return container
