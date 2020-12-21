interface MenuItem {
  rect?: [number, number, number, number];
  size?: [number, number];
  icon: string;
  activeIcon: string;
  tooltip: string;
  id: string;
  type?: number;
  inGravityType?: number;
}
const menus: MenuItem[] = [
  {
    icon: 'artboard',
    activeIcon: 'artboard-active',
    tooltip: '上传画板',
    id: 'artboard',
  },
  {
    icon: 'icon',
    id: 'icon',
    activeIcon: 'icon-active',
    tooltip: '图标',
  },
  {
    icon: 'component',
    id: 'component',
    activeIcon: 'component-active',
    tooltip: '组件',
  },
  {
    id: 'palette',
    icon: 'palette',
    activeIcon: 'palette-active',
    tooltip: '调色板',
  },
  {
    id: 'fill',
    icon: 'fill',
    activeIcon: 'fill-active',
    tooltip: '填充',
  },
  {
    id: 'help',
    icon: 'help',
    activeIcon: 'help-active',
    tooltip: '帮助中心',
    inGravityType: 3,
  },
  {
    id: 'help',
    icon: 'setting',
    activeIcon: 'setting-active',
    tooltip: '设置',
    inGravityType: 3,
  },
];

export default menus;
