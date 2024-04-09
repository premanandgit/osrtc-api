
import { v4 as uuidv4 } from 'uuid';
import { GenericPayload } from '../models/Payload';
export const getCurrentTimestamp = (): number => {
    // Get the current timestamp in milliseconds
    return Date.now();
};

export const createGenericPayload = (clientId: string, action: string, data: any): GenericPayload => {
    const messageId = uuidv4(); // Generate a unique message ID using UUID v4
    const timestamp = getCurrentTimestamp();
    return {
        messageId,
        clientId,
        timestamp,
        action,
        data,
    };
};
