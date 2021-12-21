import '../css/footer.css'

function Footer() {
  const date = new Date();
  return (
    <div className="footer">
      <span>&copy; Job Board {date.getFullYear()} | All Rights Reserved | Created by Jacob Spade</span> 
    </div>
  )
}

export default Footer
