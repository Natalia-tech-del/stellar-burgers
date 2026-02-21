type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => children;
