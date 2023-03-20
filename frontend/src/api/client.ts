import ky, { NormalizedOptions } from "ky";

const client = ky.extend({
  prefixUrl: `${import.meta.env.VITE_BACKEND_DOMAIN}/api/book`,
  retry: 1,
  hooks: {
    beforeRequest: [
      async (request: Request, options: NormalizedOptions) => {
        const access_token = localStorage.getItem("access_token");
        if (access_token) {
          request.headers.set(
            "Authorization",
            `Bearer ${JSON.parse(access_token)}`
          );
        }
      },
    ],
    afterResponse: [
      async (input, options, response) => {
        if (response.status === 403) {
          localStorage.clear();
          window.location.href = "/login";
        }
      },
    ],
  },
});

export default client;
