export const TITLE = "Some of My Notes About Math";

export const placeTitle = () => {
  const titleElements = [...document.getElementsByClassName("title")];
  titleElements?.map((titleElement) => {
    titleElement.append(TITLE);
  });
};
