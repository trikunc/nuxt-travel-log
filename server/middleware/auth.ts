import type { UserWithId } from "~/lib/auth";

import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user as unknown as UserWithId;

  // const user = session?.user;
  // const path = event.path;

  // if (path.startsWith("/dashboard") && !user) {
  //   return sendRedirect(event, "/", 302);
  // }

  // if (path === "/" && user) {
  //   return sendRedirect(event, "/dashboard", 302);
  // }

  if (event.path.startsWith("/dashboard")) {
    if (!session?.user) {
      await sendRedirect(event, "/", 302);
    }
  }
});
