class Navigation {
	private navigate: ((path: string) => void) | null = null;

	public navigateTo(path: string): void {
		if (!this.navigate) {
			return;
		}

		this.navigate(path);
	}

	public setNavigate(navigateFunction: (path: string) => void): void {
		this.navigate = navigateFunction;
	}
}

export { Navigation };
