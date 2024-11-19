export const TITLE = "Some of My Notes About Math";
export const placeTitle = () => {
    const titleElements = [...document.getElementsByClassName('title')];
    titleElements === null || titleElements === void 0 ? void 0 : titleElements.map((titleElement) => {
        titleElement.append(TITLE);
    });
};
