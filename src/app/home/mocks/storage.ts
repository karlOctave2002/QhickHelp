// Mock de Storage
export const mockContact = {
    set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
    get: jasmine.createSpy('get').and.returnValue(Promise.resolve([])),
    create: jasmine.createSpy('create').and.returnValue(Promise.resolve({})),
  };