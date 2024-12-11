const NOTION_COLORS = {
    'default': 'inherit',
    'gray': 'rgb(120, 119, 116)',
    'brown': 'rgb(159, 107, 83)',
    'orange': 'rgb(217, 115, 13)',
    'yellow': 'rgb(203, 145, 47)',
    'green': 'rgb(68, 131, 97)',
    'blue': 'rgb(51, 126, 169)',
    'purple': 'rgb(144, 101, 176)',
    'pink': 'rgb(193, 76, 138)',
    'red': 'rgb(212, 76, 71)',
    // Colores de fondo
    'gray_background': 'rgb(241, 241, 239)',
    'brown_background': 'rgb(244, 238, 238)',
    'orange_background': 'rgb(251, 236, 221)',
    'yellow_background': 'rgb(251, 243, 219)',
    'green_background': 'rgb(237, 243, 236)',
    'blue_background': 'rgb(231, 243, 248)',
    'purple_background': 'rgb(244, 240, 247)',
    'pink_background': 'rgb(249, 238, 243)',
    'red_background': 'rgb(253, 235, 236)',
  } as const;
  
  type NotionColor = keyof typeof NOTION_COLORS;

export { NOTION_COLORS, type NotionColor };