import ContainerDetail from './ContainerDetail'

it('renders without crashing', () => {
  const props = {
    location: {state: {name:"Test"}},
    match: {params: {id: 4}}
  }
  const wrapper = shallow(<ContainerDetail {...props} />);
  expect(wrapper).toMatchSnapshot();
});
