import { type NavigateFunction } from "react-router-dom";

class Navigation {
	private navigate: NavigateFunction | null = null;

	public async navigateTo(path: string): Promise<void> {
		if (!this.navigate) {
			return;
		}

		await this.navigate(path);
	}

	public setNavigate(navigateFunction: NavigateFunction): void {
		this.navigate = navigateFunction;
	}
}

export { Navigation };
