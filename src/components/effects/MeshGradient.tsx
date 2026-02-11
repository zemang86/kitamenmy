export default function MeshGradient() {
  return (
    <div className="fixed inset-0 -z-1 overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-mesh-move"
        style={{
          background: [
            "radial-gradient(ellipse at 20% 20%, rgba(0,255,136,0.06) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.05) 0%, transparent 50%)",
            "radial-gradient(ellipse at 40% 80%, rgba(168,85,247,0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 80%, rgba(255,107,107,0.03) 0%, transparent 50%)",
          ].join(", "),
        }}
      />
    </div>
  );
}
