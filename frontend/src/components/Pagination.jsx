const { createRoot } = ReactDOM;

const {  Pagination  } = antd;
const App = () => <Pagination defaultCurrent={1} total={50} />;
const ComponentDemo = App;


createRoot(mountNode).render(<ComponentDemo />);
// // modify it later