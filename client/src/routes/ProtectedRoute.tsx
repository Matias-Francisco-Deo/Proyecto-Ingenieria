import { useAuth } from '@/hooks/useAuth'
import { Redirect, Route } from 'wouter'

type ProtectedRouteProps = {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	component: React.ComponentType<any>
	path: string
}

export function ProtectedRoute({ component: Component, ...props }: ProtectedRouteProps) {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) {
		return <Redirect to="/login" />
	}

	return <Route {...props}>{(params) => <Component {...params} />}</Route>
}
