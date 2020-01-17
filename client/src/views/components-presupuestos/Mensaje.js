import React from "react";
import { Box, Item, Span, A } from "react-html-email";

function Mensaje({ user, presupuesto, auto }) {
    let total =
        parseInt(presupuesto.labor, 10) +
        presupuesto.repuestos.reduce((a, { precio }) => a + precio, 0);

    const formatDate = date => {
        const fecha = new Date(date);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return Intl.DateTimeFormat("default", options).format(fecha);
    };

    const thStyle = {
        border: "1px solid grey",
        borderRadius: "2px",
        fontWeight: "500"
    };

    return (
        <Box cellSpacing={30}>
            <Item>
                <Box
                    cellSpacing={30}
                    width="100%"
                    align="center"
                    style={{ borderBottom: "1px solid grey" }}
                >
                    <Item align="center">
                        <Span fontSize={16}>
                            {user === "montiel"
                                ? "Inyeccion Electronica - Airbag - ABS - Alarmas - Accesorios"
                                : "SERVICIO ESPECIALIZADO FORD"}
                        </Span>
                    </Item>
                    <Item align="center">
                        <Span fontSize={34}>
                            {user === "montiel"
                                ? "Taller Montiel"
                                : "Gabriel Mezzanotte"}
                        </Span>
                    </Item>
                    <Item align="center">
                        <Span fontSize={16}>
                            {user === "montiel"
                                ? "Vertiz 8190 - (0223) 155-063679 - montielelectroauto@gmail.com"
                                : "La Pampa 2265 - (0223) 475-2335 - gabimezzanotte@gmail.com (7600) Mar del Plata"}
                        </Span>
                    </Item>
                </Box>
            </Item>
            <Item>
                <Box cellSpacing={20} width="100%">
                    <Item>
                        <Span fontSize={20} lineHeight={40}>
                            Presupuesto - {formatDate(presupuesto.createdAt)}
                        </Span>
                    </Item>
                </Box>
                <Box
                    cellSpacing={5}
                    cellPadding={10}
                    width="600"
                    style={{ border: "1px solid grey" }}
                >
                    <tr>
                        <th style={thStyle}>Patente</th>
                        <th style={thStyle}>Vehiculo</th>
                        <th style={thStyle}>Kilometros</th>
                    </tr>
                    <tr>
                        <td>{presupuesto.patente.toUpperCase()}</td>
                        <td>{auto}</td>
                        <td align="right">{presupuesto.km}</td>
                    </tr>
                </Box>
                <Box cellSpacing={20} width="100%">
                    <Item>
                        <Span fontSize={20} lineHeight={40}>
                            Reparacion
                        </Span>
                    </Item>
                </Box>
                <Box
                    cellSpacing={5}
                    cellPadding={10}
                    width="600"
                    style={{ border: "1px solid grey" }}
                >
                    <tr>
                        <th colSpan="2" style={thStyle}>
                            Motivo
                        </th>
                        <th style={thStyle}>Mano de obra</th>
                    </tr>
                    <tr>
                        <td colSpan="2">{presupuesto.motivo}</td>
                        <td align="right">{presupuesto.labor}$</td>
                    </tr>
                    <tr>
                        <th style={thStyle}>Cantidad</th>
                        <th style={thStyle}>Repuesto</th>
                        <th style={thStyle}>Precio</th>
                    </tr>
                    {presupuesto.repuestos.length ? (
                        presupuesto.repuestos.map((aRepuesto, index) => (
                            <tr key={index}>
                                <td align="center">{aRepuesto.cantidad}</td>
                                <td>{aRepuesto.repuesto}</td>
                                <td align="right">{aRepuesto.precio}$</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No se detallaron repuestos</td>
                            <td align="right">0$</td>
                        </tr>
                    )}
                    <tr>
                        <th colSpan="2"></th>
                        <th style={thStyle}>Total</th>
                    </tr>
                    <tr>
                        <td colSpan="2"></td>
                        <td align="right">{total}$</td>
                    </tr>
                </Box>
            </Item>
            <Item>
                <Box
                    cellSpacing={20}
                    width="100%"
                    style={{ borderTop: "1px solid grey" }}
                >
                    <Item align="right">
                        <Span color="gray" lineHeight={20}>
                            © 2019{" "}
                            <A href="https://calarco.com.ar">CalarcoWEB</A>
                        </Span>
                    </Item>
                </Box>
            </Item>
        </Box>
    );
}

export default Mensaje;
