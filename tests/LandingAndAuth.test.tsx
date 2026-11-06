import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../src/App';

describe('BusTrack React Portal — Landing Informativa y Autenticación (Specs 04-11)', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('renderiza la landing pública con propuesta de valor, información del proyecto y estado pendiente de Google Play (Specs 06, 07, 08)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /El futuro del transporte público en/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /Desarrollado en la Universidad Tecnológica de Tula-Tepeji/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Próximamente en Google Play/i })
    ).toBeDisabled();
  });

  it('permite cambiar de pestaña interactiva en la sección de beneficios y pilares del proyecto (Spec 06)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const visionTab = screen.getByRole('tab', { name: /02 · Visión Artificial Anónima/i });
    fireEvent.click(visionTab);

    expect(
      screen.getByRole('heading', { name: /Estimación de ocupación sin invadir tu privacidad/i })
    ).toBeInTheDocument();
  });

  it('permite configurar la preferencia de analítica respetuosa de la privacidad sin PII (Spec 11)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const disableBtn = screen.getByRole('button', { name: /Desactivar/i });
    fireEvent.click(disableBtn);

    expect(
      screen.getByText(/Medición desactivada/i)
    ).toBeInTheDocument();
  });

  it('redirige de /panel a /login cuando no hay sesión autenticada (Specs 04, 05)', () => {
    render(
      <MemoryRouter initialEntries={['/panel']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Inicio de sesión/i })
    ).toBeInTheDocument();
  });

  it('valida campos vacíos en el formulario de inicio de sesión (Spec 13)', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Ingresar/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('El usuario es obligatorio.')).toBeInTheDocument();
    expect(screen.getByText('La contraseña es obligatoria.')).toBeInTheDocument();
  });
});
