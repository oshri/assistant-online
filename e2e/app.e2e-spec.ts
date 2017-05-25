import { AssistantOnlinePage } from './app.po';

describe('Assistant Online App', () => {
  let page: AssistantOnlinePage;

  beforeEach(() => {
    page = new AssistantOnlinePage();
  });

  it('should display the navbar correctly', () => {
    page.navigateTo();
    expect(page.getNavbarElement(0)).toEqual('Home');
    expect(page.getNavbarElement(1)).toEqual('Cats');
    expect(page.getNavbarElement(2)).toEqual('Login');
    expect(page.getNavbarElement(3)).toEqual('Register');
  });
});
