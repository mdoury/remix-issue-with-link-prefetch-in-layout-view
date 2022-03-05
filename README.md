# This is the reproduction of an issue I encountered with Remix v1.2.3

## Description of the issue

Here is a quick description of my app :
- a layout route wrapping the entire application
- a login route with both a view and an action
- a logout ressource route with an action only
- a set of secured routes that redirect users who are not logged-in to the login route
- I'm using the provided session cookie helpers from `createCookieSessionStorage`

My issue is with data prefetching of secured routes, in particular when I add a `Link` to one of the protected routes, with `prefetch=intent`, inside a layout route. 

When I do the following actions in that order things becomes weird:
- login, 
- visit a secured route, 
- logout, 
- login again 
- visit the same secured route again
Then I'm redirected to the login page while still logged-in 🤯
I know this scenario sounds stupid, but I believe this reveals something, assuming of course I'm not doing something totally wrong.

Here is what I could figure out so far:

To begin with, I saw that the `link` tags associated with `Link` components that are not unmounted from the DOM, for instance in a layout route or in the root file, are not unmounted from the DOM either. 
The issue is, during the prefetch and the actual need for the data, network responses can set cookies and therefore potentially invalidate the prefetched data response.

Switching to the network tab, I realised that just after the redirection to the login route following the logout POST request, data is prefetched by the browser (request type is "fetch" for all requests handled by Remix, and either "json" or "text/plain" when handled by the browser directly, additionally the request contains `Purpose: prefetch` header). 

Because the prefetch request occurs just after the cookie is unset, the prefetched data is actually an empty response with the `X-Remix-Redirect` header.
However after the redirection following the login POST request, data is not prefetched by the browser. 
So when I visit the secured page again, I hit the cache and get the redirect response that was prefetched when I was logged-out.

## Reproduction of the issue

I reimplemented a minimal reproduction of the issue by pruning almost everything and by oversimplifying authentication. 
However I was not able to make tests fail with jest (probably because I was handling the mouseover wrong...), so I switched to Cypress. 

I realized my layout route was pathless so I tried switching that in the tests but the tests still failed.
I also implemented succeeding tests for reference, this is the case where the `Link` component is not in the layout route and is therefore unmounted on URL change.

You can find it here: https://github.com/mdoury/remix-issue-with-link-prefetch-in-layout-view

## To reproduce it yourself

Clone the repository:

```sh
# HTTPS
git clone https://github.com/mdoury/remix-issue-with-link-prefetch-in-layout-view.git

# SSH
git clone git@github.com:mdoury/remix-issue-with-link-prefetch-in-layout-view.git

# GITHUB CLI
gh repo clone mdoury/remix-issue-with-link-prefetch-in-layout-view
```

Install depencencies:

```sh
npm install
```

Launch the dev server in watch mode:

```sh
npm run dev
```

Launch Cypress in watch mode too:

```sh
npx cypress open
```