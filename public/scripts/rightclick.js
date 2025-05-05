class ContextMenu {
    constructor({target = null, menuItems = [], mode = "dark"}) {
        this.target = target;
        this.menuItems = menuItems;
        this.mode = mode;
        this.targetNode = this.getTargetNode();
        this.menuItemsNode = this.getMenuItemsNode();
        this.isOpened = false;
    }

    getTargetNode() {
        const nodes = document.querySelectorAll(this.target);

        if (nodes && nodes.length !== 0) {
            return nodes;
        } else {
            console.error(`getTargetNode :: "${this.target}" target not found`);
            return [];
        }
    }

    getMenuItemsNode() {
        const nodes = [];

        if (!this.menuItems) {
            console.error("getMenuItemsNode :: Please enter menu items");
            return [];
        }

        this.menuItems.forEach((data, index) => {
            const item = this.createItemMarkup(data);
            item.firstChild.setAttribute(
                "style",
                `animation-delay: ${index * 0.08}s`
            );
            nodes.push(item);
        });

        return nodes;
    }

    createItemMarkup(data) {
        const button = document.createElement("BUTTON");
        const item = document.createElement("LI");

        button.innerHTML = data.content;
        button.classList.add("contextMenu-button");
        item.classList.add("contextMenu-item");

        if (data.divider) item.setAttribute("data-divider", data.divider);
        item.appendChild(button);

        if (data.events && data.events.length !== 0) {
            Object.entries(data.events).forEach((event) => {
                const [key, value] = event;
                button.addEventListener(key, value);
            });
        }

        return item;
    }

    renderMenu() {
        const menuContainer = document.createElement("UL");

        menuContainer.classList.add("contextMenu");
        menuContainer.setAttribute("data-theme", this.mode);

        this.menuItemsNode.forEach((item) => menuContainer.appendChild(item));

        return menuContainer;
    }

    closeMenu(menu) {
        if (this.isOpened) {
            this.isOpened = false;
            menu.remove();
        }
    }

    init() {
        const contextMenu = this.renderMenu();
        document.addEventListener("click", () => this.closeMenu(contextMenu));
        window.addEventListener("blur", () => this.closeMenu(contextMenu));
        document.addEventListener("contextmenu", (e) => {
            this.targetNode.forEach((target) => {
                if (!e.target.contains(target)) {
                    contextMenu.remove();
                }
            });
        });

        this.targetNode.forEach((target) => {
            target.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                this.isOpened = true;

                const {clientX, clientY} = e;
                document.body.appendChild(contextMenu);

                const positionY =
                    clientY + contextMenu.scrollHeight >= window.innerHeight
                        ? window.innerHeight - contextMenu.scrollHeight - 20
                        : clientY;
                const positionX =
                    clientX + contextMenu.scrollWidth >= window.innerWidth
                        ? window.innerWidth - contextMenu.scrollWidth - 20
                        : clientX;

                contextMenu.setAttribute(
                    "style",
                    `--width: ${contextMenu.scrollWidth}px;
          --height: ${contextMenu.scrollHeight}px;
          --top: ${positionY}px;
          --left: ${positionX}px;`
                );
            });
        });
    }
}

const aboutIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" style="margin-right: 7px">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>`;

const skillsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" style="margin-right: 7px">
  <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3q0-.405-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708M3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026z"/>
</svg>`;

const projectsIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" style="margin-right: 7px">
  <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.825a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3m-8.322.12q.322-.119.684-.12h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981z"/>
</svg>`;

const contactIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" style="margin-right: 7px">
  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
</svg>`;

const resumeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" style="margin-right: 7px">
  <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z"/>
  <path fill-rule="evenodd" d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"/>
</svg>`;

const linkedinIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" style="margin-right: 7px">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
</svg>`;

const githubIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" style="margin-right: 7px">
  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
</svg>`;

const menuItems = [
    {
        content: `${aboutIcon}About`,
        events: {
            click: (e) => {
                e.preventDefault();
                document
                    .getElementById("about")
                    ?.scrollIntoView({behavior: "smooth"});
            }
        }
    },
    {
        content: `${projectsIcon}Projects`,
        events: {
            click: (e) => {
                e.preventDefault();
                document
                    .getElementById("projects")
                    ?.scrollIntoView({behavior: "smooth"});
            }
        }
    },
    {
        content: `${skillsIcon}Skills`,
        events: {
            click: (e) => {
                e.preventDefault();
                document
                    .getElementById("skills")
                    ?.scrollIntoView({behavior: "smooth"});
            }
        }
    },
    {
        content: `${contactIcon}Contact`,
        events: {
            click: (e) => {
                e.preventDefault();
                document
                    .getElementById("contact")
                    ?.scrollIntoView({behavior: "smooth"});
            }
        }
    },
    {
        content: `${resumeIcon}Resume`,
        events: {
            click: (e) => {
                window.open("media/kartik.resume.pdf", "_blank");
            }
        },
        divider: "top"
    },
    {
        content: `${githubIcon} Github `,
        events: {
            click: (e) => {
                window.open("https://github.com/kartik2005221", "_blank");
            }
        }
    },
    {
        content: `${linkedinIcon}LinkedIn`,
        events: {
            click: (e) => {
                window.open("https://linkedin.com/in/kartik2005221", "_blank");
            }
        }
    }
];

// Initialize only dark theme
const contextMenu = new ContextMenu({
    target: ".target-dark",
    menuItems
});

contextMenu.init();

// Remove window blur event listener if not needed
window.addEventListener("click", () => {
    const menu = document.querySelector(".contextMenu");
    if (menu) menu.remove();
});
