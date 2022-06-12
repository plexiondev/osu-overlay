# osu! overlay

obs overlay for osu!, using html + gosumemory.

## Variations
click an image for more information

[![Panel](https://user-images.githubusercontent.com/46572320/173233872-4c7de7af-6c31-4827-be5b-4c6364efd613.png)](gosumemory/p-panel/README.md)

[![Classic](https://user-images.githubusercontent.com/46572320/173234427-006b5365-4ecb-4c53-b031-2fcc6546cbb2.png)](gosumemory/p-classic/README.md)



## Requirements

- Internet connection (main css is stored @ [plexion.dev](https://plexion.dev))
- Latest version of [gosumemory](https://github.com/l3lackShark/gosumemory)
- osu!stable/beta/cutting-edge (gosumemory [doesn't support lazer](https://github.com/l3lackShark/gosumemory/pull/41))

## Install

#### gosumemory
1. [Install gosumemory](https://github.com/l3lackShark/gosumemory#usage)
2. Copy the 2 folders in the [gosumemory](gosumemory/) folder into your `gosumemory/static` install folder
3. Boot up gosumemory and head to `127.0.0.1:24050`, if you see a list of files you succeeded
4. Create a Browser Source for whichever variation you chose and follow it's [individual instructions](gosumemory/)

#### Camera/Screen borders (legacy)
An optional addition that includes built-in display and camera borders.

1. Create a **Browser Source** in OBS for the display and camera
2. Enable **Local file**, and browse for [main/overlay.html](main/overlay.html) & [main/overlay-cam.html](main/overlay-cam.html)
3. Scale your elements accordingly:

| Property | Value |
| -------- | ----- |
| Display | 1600x1900 |
| Camera | 646x362 |
| Handcam | 476x210 |

> Your `overlay-cam.html` browser source can be cropped to optionally remove the handcam.

#### Extras

- The KeyOverlay can be found [here, by blondazz](https://github.com/Blondazz/KeyOverlay)

---

If you're having any trouble, [create an issue](https://github.com/plexiondev/osu-overlay/issues)

