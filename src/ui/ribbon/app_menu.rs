//! File commands, Options and recent drawings in the application menu.

use std::path::PathBuf;

use iced::Element;

use super::{minimize::MINIMIZE_MENU_ID, Ribbon};
use crate::app::Message;
use crate::ui::icons;

/// The application menu's dropdown id.
pub const APP_MENU_ID: &str = "APP_MENU";
const MENU_W: f32 = 300.0;
/// How many recent drawings the menu lists.
const RECENT_LIMIT: usize = 9;

/// Whether the dropdown `id` belongs to the window chrome and so works
/// without a drawing, on the Start tab.
pub fn works_without_drawing(id: &str) -> bool {
    id == APP_MENU_ID || id == MINIMIZE_MENU_ID
}

impl Ribbon {
    /// Close the application menu; whether it was open.
    pub fn close_app_menu(&mut self) -> bool {
        let open = self.open_dropdown.as_deref() == Some(APP_MENU_ID);
        if open {
            self.close_dropdown();
        }
        open
    }

    /// The application menu under the logo: the file commands and Options,
    /// then the recent drawings.
    pub(super) fn app_menu(&self, recent: &[PathBuf], win: (f32, f32)) -> Element<'_, Message> {
        use crate::ui::kit::menu::{self, Item};
        let mut items: Vec<Item> = commands()
            .into_iter()
            .map(|(icon, label, shortcut, command)| {
                let item = Item::new(label, Message::Command(command.to_string())).icon(icon);
                if shortcut.is_empty() {
                    item
                } else {
                    item.shortcut(shortcut)
                }
            })
            .collect();
        if !recent.is_empty() {
            items.push(Item::Separator);
            items.push(Item::Heading(
                crate::tr!("ribbon-menu", "recent-drawings").to_uppercase(),
            ));
            items.extend(recent.iter().take(RECENT_LIMIT).map(|path| {
                let name = path
                    .file_name()
                    .map_or_else(|| path.to_string_lossy(), |name| name.to_string_lossy())
                    .into_owned();
                Item::new(name, Message::OpenRecent(path.clone()))
                    .icon(icons::DOC)
                    .tip(path.display().to_string())
            }));
        }
        // The kit menu, at least as wide as it always was.
        let width = menu::width(&items).max(MENU_W);
        let panel = menu::view_at_least(items, MENU_W);
        self.place_dropdown(APP_MENU_ID, panel, width, win.0)
    }
}

/// The application menu's commands: icon, label, shortcut and command.
pub(super) fn commands() -> [(&'static [u8], String, &'static str, &'static str); 7] {
    [
        (
            icons::DOC_NEW,
            crate::t!("New").into_owned(),
            "Ctrl+N",
            "NEW",
        ),
        (
            icons::FOLDER_OPEN,
            crate::t!("Open...").into_owned(),
            "Ctrl+O",
            "OPEN",
        ),
        (
            icons::SAVE,
            crate::t!("Save").into_owned(),
            "Ctrl+S",
            "QSAVE",
        ),
        (
            icons::FILE_EXPORT,
            crate::t!("Save as...").into_owned(),
            "",
            "SAVEAS",
        ),
        (
            icons::DOC,
            crate::t!("Export PDF").into_owned(),
            "",
            "EXPORTPDF",
        ),
        (
            icons::PRINT,
            crate::tr!("ribbon-menu", "plot"),
            "Ctrl+P",
            "PLOT",
        ),
        (
            icons::GEAR,
            crate::t!("Options").into_owned(),
            "",
            "OPTIONS",
        ),
    ]
}

#[cfg(test)]
mod tests {
    #[test]
    fn every_application_menu_command_is_known() {
        let known = crate::command::all_registered_command_names();
        for command in [
            "NEW",
            "OPEN",
            "QSAVE",
            "SAVEAS",
            "EXPORTPDF",
            "PLOT",
            "OPTIONS",
        ] {
            assert!(known.contains(&command), "{command} is not registered");
        }
    }
}
