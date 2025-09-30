import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlunos } from './lista-alunos';

describe('ListaAlunos', () => {
  let component: ListaAlunos;
  let fixture: ComponentFixture<ListaAlunos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAlunos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAlunos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
