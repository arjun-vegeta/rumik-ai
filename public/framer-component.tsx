export default function IraChat() {
  return (
    <iframe 
      src="https://rumik-ai.vercel.app/embed/ira" 
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        borderRadius: '8px',
      }}
      title="Ira Chat Widget"
      allow="clipboard-write"
    />
  )
}

// Optional: Add controls for customization
export function IraChatCustomizable({ width = "100%", height = "600px", borderRadius = "8px" }) {
  return (
    <iframe 
      src="https://rumik-ai.vercel.app/embed/ira" 
      style={{
        width: width,
        height: height,
        border: 'none',
        borderRadius: borderRadius,
      }}
      title="Ira Chat Widget"
      allow="clipboard-write"
    />
  )
}
