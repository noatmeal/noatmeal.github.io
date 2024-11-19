import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { placeTitle, TITLE } from "./scripts.ts";

describe("placeTitle", () => {
  const titleClass = "title";
  const notTitleClass = `not-${titleClass}`;

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
  
  it(`should append the title to all elements with the '${titleClass}' class`, () => {

    document.body.innerHTML = `
      <div class="${titleClass}"></div>
      <div class="${titleClass}"></div>
      <div class="${notTitleClass}"></div>
    `;

    const titleElements = document.getElementsByClassName(titleClass);
    expect(titleElements.length).toBe(2);

    placeTitle();

    Array.from(titleElements).forEach((element) => {
      expect(element.textContent).toContain(TITLE);
    });
  });

  it(`should leave ${notTitleClass} elements unaffected`, () => {

    document.body.innerHTML = `
      <div class="${titleClass}"></div>
      <div class="${notTitleClass}"></div>
    `;

    const notTitleElement = document.querySelector(`.${notTitleClass}`);

    placeTitle();

    expect(notTitleElement?.textContent).toBe("");
  });
});

