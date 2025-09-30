import { TestBed } from '@angular/core/testing';

import { AlunosService } from './alunos.service';

describe('Alunos', () => {
  let service: AlunosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlunosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
