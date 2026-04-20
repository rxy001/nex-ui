## Menu

当焦点位于触发器时：
- Enter, Space:
  - 打开菜单并将焦点置于第一个可聚焦 menuitem 上。
- ArrowDown:
  - 打开菜单并将焦点置于第一个可聚焦 menuitem 上。
- ArrowUp:
  - 打开菜单并将焦点置于最后一个可聚焦 menuitem 上。

当 menu 打开时：
- Tab, Shift + Tab:
  - Tab 和 Shift + Tab 键无法在菜单项之间切换焦点。
  - 将焦点移出当前菜单，关闭所有菜单与子菜单。
  - 移动焦点到下一个或上一个可聚焦元素。

- Space, Enter:
  - 当焦点位于 menuitemcheckbox 上时，更改其状态而不关闭菜单。
  - 当焦点位于未被选中的 menuitemradio 上时，在不关闭菜单的情况下，选中当前获得焦点的 menuitemradio，并取消选中同一组中其他所有已被选中的 menuitemradio 元素。
  - 当焦点位于带有子菜单的 menuitem 上时，将打开该子菜单并将焦点置于其第一个可聚焦 menuitem 上。
  - 当焦点位于 menuitem 且该菜单项没有子菜单时，激活menuitem并关闭菜单。

- ArrowDown:
  - 将焦点移至下一个 menuitem。
  - 如果当前 menuitem 是最后一个，则将焦点移至第一个 menuitem。

- ArrowUp:
  - 将焦点移至上一个 menuitem。
  - 如果当前 menuitem 是第一个，则将焦点移至最后一个 menuitem。

- ArrowRight:
  - 当焦点位于带有子菜单的 menuitem 上时，打开该子菜单并将焦点置于其第一个可聚焦 menuitem 上。

- ArrowLeft:
  - 当焦点位于子菜单的 menuitem 上时，关闭该子菜单并将焦点移回父菜单的 menuitem 上。

- Home:
  - 将焦点移至第一个 menuitem。

- End:
  - 将焦点移至最后一个 menuitem。

- Typeahead
  - 当用户在菜单上键入字母时，焦点将移至下一个以该字母开头的 menuitem。
  - 如果没有以该字母开头的 menuitem，则焦点将保持不变。


## Select

当焦点位于触发器时：
- ArrowDown:
  - 打开 Popup 并将焦点置于已选择的选项上（如果存在）。
  - 否则，将焦点移至第一个可聚焦选项。

- ArrowUp:
  - 打开 Popup 并将焦点置于已选择的选项上（如果存在）。
  - 否则，将焦点移至最后一个可聚焦选项。

- Enter, Space:
  - 打开 Popup 并将焦点置于已选择的选项上（如果存在）。
  - 否则，将焦点移至第一个可聚焦选项。
 
- Typeahead:
  - 当用户键入字母时，直接更改 Select 的状态将以该字母开头的选项选中。
  - 如果已经选择了该选项，移动到下一个以该字母开头的选项。

当 Popup 打开时：

- Tab, Shift + Tab:
  - Tab 和 Shift + Tab 键无法在菜单项之间切换焦点。
  - 将焦点移出当前菜单，关闭所有菜单与子菜单。
  - 移动焦点到下一个或上一个可聚焦元素。

- Space, Enter:
  - 单选时，选中当前获得焦点的选项并关闭 Popup。
  - 多选时，更改当前获得焦点的选项的状态而不关闭 Popup。

- ArrowDown:
  - 将焦点移至下一个选项。

- ArrowUp:
  - 将焦点移至上一个选项。

- Home:
  - 将焦点移至第一个选项。

- End:
  - 将焦点移至最后一个选项。

- Typeahead:
  - 当用户在键入字母时，焦点将移至以该字母开头的选项。
  - 如果已经选择了该选项，移动到下一个以该字母开头的选项。
  - 如果没有以该字母开头的选项，则焦点将保持不变。