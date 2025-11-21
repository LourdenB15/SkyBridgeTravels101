import Header from './Header'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-light-gray">
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
