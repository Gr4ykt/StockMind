// Middleware para validar solicitudes desde Flowise
export const flowiseRequired = (req, res, next) => {
    const referer = req.get('Referer');
    const origin = req.get('Origin');
    const userAgent = req.get('User-Agent');
    
    // Verificar si la solicitud proviene de Flowise (localhost:5001)
    const allowedOrigins = [
        'http://localhost:5001',
        'http://127.0.0.1:5001'
    ];
    
    const allowedReferers = [
        'http://localhost:5001/',
        'http://127.0.0.1:5001/',
        'http://localhost:5001/api/v1/prediction/',
        'http://127.0.0.1:5001/api/v1/prediction/'
    ];
    
    // Verificar origen
    const isValidOrigin = origin && allowedOrigins.some(allowedOrigin => 
        origin.startsWith(allowedOrigin)
    );
    
    // Verificar referer
    const isValidReferer = referer && allowedReferers.some(allowedReferer => 
        referer.startsWith(allowedReferer)
    );
    
    // Verificar si es una solicitud directa desde Flowise API
    const isFlowiseAPI = req.path.includes('/api/v1/prediction/') || 
                        (userAgent && userAgent.includes('axios')) ||
                        (userAgent && userAgent.includes('node-fetch'));
    
    // Log para debugging
    console.log('Flowise Middleware Check:', {
        origin,
        referer,
        userAgent,
        path: req.path,
        isValidOrigin,
        isValidReferer,
        isFlowiseAPI
    });
    
    // Permitir si cumple alguna de las condiciones
    if (isValidOrigin || isValidReferer || isFlowiseAPI) {
        // Agregar header personalizado para identificar solicitudes de Flowise
        req.fromFlowise = true;
        return next();
    }
    
    // Si no es una solicitud válida desde Flowise, rechazar
    return res.status(403).json({
        message: 'Access denied: Invalid origin or referer',
        error: 'FLOWISE_ACCESS_DENIED'
    });
};