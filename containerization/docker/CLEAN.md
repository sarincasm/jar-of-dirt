<!-- @format -->

# Keeping Docker Host Clean

## Cheat Sheet

```
// docker disk usage
docker system df

// stopped containers, networks not used by at least one container, dangling images, build cache
docker system prune

// above + volumes not used by at least one container
docker system prune --volumes

// dangling images
docker image prune

// images without at least one container associated
docker image prune -a

// all stopped containers
docker container prune

// volumes not used by at least one container
docker volume prune

// networks not used by at least one container
docker network prune
```

## Reference

-  https://docs.docker.com/config/pruning/
-  https://docs.docker.com/engine/reference/commandline/image_prune/
-  https://docs.docker.com/engine/reference/commandline/container_prune/
-  https://docs.docker.com/engine/reference/commandline/volume_prune/
-  https://docs.docker.com/engine/reference/commandline/system_df/
