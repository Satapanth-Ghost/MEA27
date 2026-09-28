export default function MotionBackground() {
	return (
		<div className="mea-motion-background" aria-hidden="true">
			<video autoPlay muted loop playsInline preload="metadata">
				<source src="/media/mea-motion.mp4" type="video/mp4" />
			</video>
			<div className="mea-motion-background-tint" />
		</div>
	);
}
