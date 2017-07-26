import Spinner from './Spinner'

it('renders without crashing', () => {
  const wrapper = shallow(<Spinner />);
  expect(wrapper).toMatchSnapshot();
});
