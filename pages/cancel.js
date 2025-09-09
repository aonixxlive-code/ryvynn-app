export default function Cancel() {
  return (
    <main style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#000",color:"#fff"}}>
      <div style={{maxWidth:600,padding:24}}>
        <h1 style={{marginBottom:8}}>Checkout canceled</h1>
        <p style={{opacity:.8}}>No charges were made. You can resume anytime.</p>
      </div>
    </main>
  );
}
