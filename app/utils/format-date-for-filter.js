export function formatDateForFilter(date) {
    return date.toString({ calendarName: 'never' }) + 'T00:00:00Z';
}
