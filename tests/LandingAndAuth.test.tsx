import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../src/App';

describe('BusTrack React Portal — Landing Urban Transit Pulse y Autenticación', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('renderiza la landing pública con propuesta de valor, aviso de Google Play y equipo UTTT', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Hero title
    expect(
      screen.getByRole('heading', { name: /Tu ruta, más clara\. Tu viaje, más fácil\./i })
    ).toBeInTheDocument();

    // Value propositions
    expect(screen.getByText(/Movilidad Inteligente en Hidalgo · UTTT/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sin rastreo GPS invasivo/i).length).toBeGreaterThan(0);

    // Google Play disclaimer
    expect(
      screen.getByText(/El enlace oficial se habilitará al publicarse la aplicación en la tienda\./i)
    ).toBeInTheDocument();

    // Academic credits
    expect(
      screen.getByRole('heading', { name: /Equipo de Desarrollo e Innovación/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Fátima Ximena García González/i)).toBeInTheDocument();
    expect(screen.getByText(/Diego Parra Cruz/i)).toBeInTheDocument();
    expect(screen.getByText(/José de Jesús López Islas/i)).toBeInTheDocument();
    expect(screen.getByText(/Melanie Joliee Bonilla Domínguez/i)).toBeInTheDocument();
  });

  it('permite interactuar con la demo de rutas y abrir el modal de detalles', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Click quick preset: Pachuca ↔ Mineral del Monte
    const pachucaBtn = screen.getByRole('button', { name: /Pachuca ↔ Mineral del Monte/i });
    fireEvent.click(pachucaBtn);

    // Wait for route results to update
    await waitFor(() => {
      expect(screen.getByText(/Pachuca – Real del Monte Express/i)).toBeInTheDocument();
    });

    // Click "Ver detalles" button on first route
    const detailsButtons = screen.getAllByRole('button', { name: /Ver detalles/i });
    fireEvent.click(detailsButtons[0]);

    // Modal should appear with stops timeline
    expect(screen.getByText(/Detalles de Ruta Oficial/i)).toBeInTheDocument();
    expect(screen.getByText(/Secuencia de Paradas Autorizadas/i)).toBeInTheDocument();

    // Close modal
    const closeBtn = screen.getByRole('button', { name: /Entendido, cerrar detalles/i });
    fireEvent.click(closeBtn);

    expect(screen.queryByText(/Secuencia de Paradas Autorizadas/i)).not.toBeInTheDocument();
  });

  it('permite alternar pestañas interactivas de arquitectura y cobertura', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Switch Architecture Stage tab
    const stage3Btn = screen.getByRole('button', { name: /Etapa 3 · Machine Learning/i });
    fireEvent.click(stage3Btn);

    expect(
      screen.getByRole('heading', { name: /Detección de Paradas y Estimación de Aforo/i })
    ).toBeInTheDocument();

    // Switch Coverage zone
    const tepejiBtn = screen.getByRole('button', { name: /Tepeji del Río/i });
    fireEvent.click(tepejiBtn);

    expect(
      screen.getByText(/Zona Industrial y Conexión México–Querétaro/i)
    ).toBeInTheDocument();
  });

  it('permite interactuar con el Laboratorio de Física PWA y sus 4 pestañas', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/Laboratorio de Física &/i)).toBeInTheDocument();
    expect(screen.getByText(/BusTrack Core Telemetría/i)).toBeInTheDocument();

    // Alternar a Isla Dinámica
    const islandTab = screen.getByRole('button', { name: /2. Isla Dinámica/i });
    fireEvent.click(islandTab);
    expect(screen.getByText(/Unidad UTTT Sincronizada/i)).toBeInTheDocument();

    // Alternar a Canvas + Imán
    const canvasTab = screen.getByRole('button', { name: /3. Canvas \+ Imán/i });
    fireEvent.click(canvasTab);
    expect(
      screen.getByRole('button', { name: /botón magnético de parada/i })
    ).toBeInTheDocument();

    // Alternar a Micro-SVG
    const microTab = screen.getByRole('button', { name: /4. Micro-SVG/i });
    fireEvent.click(microTab);
    expect(screen.getByText(/Sincronización de Catálogo/i)).toBeInTheDocument();
    expect(screen.getByText(/Tarifa Dinámica/i)).toBeInTheDocument();
    expect(screen.getByText(/Calificar Servicio/i)).toBeInTheDocument();
  });

  it('permite aceptar el aviso de privacidad y telemetría', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const acceptBtn = screen.getByRole('button', { name: /Aceptar/i });
    fireEvent.click(acceptBtn);

    expect(
      screen.queryByRole('region', { name: /Consentimiento de privacidad y telemetría/i })
    ).not.toBeInTheDocument();
  });

  it('redirige de /panel a /login cuando no hay sesión autenticada', () => {
    render(
      <MemoryRouter initialEntries={['/panel']}>
        <App />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Inicio de sesión/i })
    ).toBeInTheDocument();
  });

  it('valida campos vacíos en el formulario de inicio de sesión', () => {
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
