# osu! overlay

obs overlay for osu!, using html + gosumemory.

## variations
click an image for more information

[![Panel](https://user-images.githubusercontent.com/46572320/173233872-4c7de7af-6c31-4827-be5b-4c6364efd613.png)](gosumemory/p-panel/README.md)

[![Classic](https://user-images.githubusercontent.com/46572320/173233985-6d3354e4-126d-4ec3-90a2-d59ac012d6e0.png)](gosumemory/p-classic/README.md)




## requirements

* internet connection (to connect to [plexion.dev](https://plexion.dev) for the css - will be removed soon)
* [gosumemory](https://github.com/l3lackShark/gosumemory)
* osu!stable (gosumemory [doesn't support lazer](https://github.com/l3lackShark/gosumemory/pull/41))

## install

#### gosumemory
1. [install gosumemory](https://github.com/l3lackShark/gosumemory#usage)
2. copy the 2 folders in my `gosumemory` folder into your `gosumemory/static` install folder
3. boot up gosumemory and head to `127.0.0.1:24050`
4. use `http://127.0.0.1:24050/mica-background/` for the background image
5. and `http://127.0.0.1:24050/plexion-info/` for the main song info (with width `900` by height `236`)

#### main
1. create a browser source in obs
2. check `local file` and locate the individual html files
3. resize your display capture, facecam and handcam to match up
* (or remove the handcam div from `overlay-cam.html` if you don't have another camera)

#### additional keyoverlay

* can be found [here, by blondazz](https://github.com/Blondazz/KeyOverlay)

## help

if you're having any trouble, [create an issue](https://github.com/plexiondev/osu-overlay/issues)

## gallery

![](https://plexion.dev/img/osu!/booba.png)

![](https://plexion.dev/img/osu!/midnight.png)
