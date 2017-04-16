import ContainerDetail from './ContainerDetail'

it('renders without crashing', () => {
  const wrapper = shallow(<ContainerDetail name="Test" id={4} onClose={jest.fn}/>);
  expect(wrapper).toMatchSnapshot();
});
