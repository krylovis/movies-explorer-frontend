export default function AuthContainer(props) {
  const { children } = props;
  return (
    <section className="auth">
      {children}
    </section>
  )
}