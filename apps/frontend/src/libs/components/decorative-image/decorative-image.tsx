type Properties = {
	className?: string;
	src: string;
};

const DecorativeImage: React.FC<Properties> = ({
	className = "",
	src,
}: Properties) => (
	<img
		alt=""
		aria-hidden="true"
		className={className}
		loading="lazy"
		src={src}
	/>
);

export { DecorativeImage };
