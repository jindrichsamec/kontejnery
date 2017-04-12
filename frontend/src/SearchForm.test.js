import SearchForm from './SearchForm'

describe('SearchForm', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<SearchForm onSearch={jest.fn}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('normalize data from `/list` endpoint', () => {

    const json = {
      data: [
        {
          "coordinates": {
            "lat": 50.1299980318329,
            "lng": 14.4796317815781
          },
          "id": 54,
          "name": "T\u0159ebenick\u00e1 x Sebuz\u00ednsk\u00e1 (parkovi\u0161t\u011b) (Kobylisy)",
          "till": "Tue, 11 Apr 2017 19:00:00 GMT"
        },
        {
          "coordinates": {
            "lat": 50.1381542860827,
            "lng": 14.434243440628
          },
          "id": 57,
          "name": "Fo\u0159tova x Do \u00dadol\u00ed (\u010cimice)",
          "till": new Date("Thu, 13 Apr 2017 19:00:00 GMT")
        }
      ]
    };

    const expected = [
      {...json.data[0], till: new Date("Tue, 11 Apr 2017 19:00:00 GMT")},
      {...json.data[1], till: new Date("Thu, 13 Apr 2017 19:00:00 GMT")},
    ];

    const component = new SearchForm()
    expect(component.normalizeData(json)).toMatchObject(expected)

  });

})

