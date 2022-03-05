type Options = {
  linkSelector: string;
  loginButtonSelector?: string;
  loginRedirectRoute?: string;
  logoutButtonSelector?: string;
  loginRoute?: string;
  protectedRoute?: string;
};

function canVisitProtectedPage(options: Options) {
  const {
    linkSelector,
    loginButtonSelector = ".login",
    logoutButtonSelector = ".logout",
    loginRoute = "/login",
    protectedRoute = "/protected-route",
  } = options;
  cy.visit(loginRoute);
  cy.get(loginButtonSelector).click();
  cy.get(linkSelector).trigger("mouseover").wait(300).click();
  cy.get(logoutButtonSelector).click();
  cy.get(loginButtonSelector).click();
  cy.get(linkSelector).trigger("mouseover").wait(300).click();

  cy.url().should("include", protectedRoute);
  cy.get("pre").should("have.text", "current-user-id");
}

describe('Link component with prefetch="intent"', () => {
  afterEach(() => cy.clearCookies());

  it("can prefetch protected pages when Link component is in a pathless layout route", () => {
    canVisitProtectedPage({ linkSelector: ".layout-link" });
  });

  it("can prefetch protected pages when Link component is in an index route nested in a pathless layout route", () => {
    canVisitProtectedPage({ linkSelector: ".index-link" });
  });

  it("can prefetch protected pages when Link component is in a layout route", () => {
    canVisitProtectedPage({
      linkSelector: ".layout-link",
      loginRoute: "/layout/login",
      protectedRoute: "/layout/protected-route",
    });
  });

  it("can prefetch protected pages when Link component is in an index route nested in a layout route", () => {
    canVisitProtectedPage({
      linkSelector: ".index-link",
      loginRoute: "/layout/login",
      protectedRoute: "/layout/protected-route",
    });
  });
});
