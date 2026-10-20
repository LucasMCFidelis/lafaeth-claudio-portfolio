import requireAdmin from "@/app/data/user/require-admin";

/**
 * Renders its children only for a logged-in admin; redirects otherwise.
 * Reads the session, so render it inside <Suspense>. Children (and any
 * PrefetchBoundary in them) only start after the check passes.
 */
const AdminOnly = async ({ children }: { children: React.ReactNode }) => {
  await requireAdmin();
  return <>{children}</>;
};

export default AdminOnly;
