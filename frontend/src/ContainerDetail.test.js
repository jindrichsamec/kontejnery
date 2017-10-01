jest.mock('./model/SearchQuery')
import ContainerDetail from './ContainerDetail'
import SearchQuery from './model/SearchQuery'

it('renders without crashing', () => {
  SearchQuery.since = new Date()
  const props = {
    location: {state: {name:"Test"}},
    match: {params: {id: 4}}
  }
  const wrapper = shallow(<ContainerDetail {...props} />);
  expect(wrapper).toMatchSnapshot();
});
