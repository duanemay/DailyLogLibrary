/**
 * Contains a number of functions to assist in adding an automatic date header
 *
 * insertTodaysMonthHeader(matchHeading, matchContent)
 * insertFutureMonthHeader(daysFromNow, matchHeading, matchContent)
 * insertTodaysDailyHeaderAndList(matchHeading, matchContent)
 * insertFutureDailyHeaderAndList(daysFromNow, matchHeading, matchContent)
 * insertTodaysDailyHeader(matchHeading, matchContent)
 * insertFutureDailyHeader(daysFromNow, matchHeading, matchContent)
 * getDaysFromNowDate(daysFromNow)
 * isDifferentMonth(daysFromNow)
 * formatDate(date)
 * formatMonth(date)
 * formatHeader(header, headingStyle)
 * formatListItem(list)
 * formatListItemLevelAndGlyph(list, level, glyph)
 * insertParagraphAfter(insertionAfterParagraph, paragraphToInsert)
 * getParagraphMatchingHeadingWithContent(matchHeading, matchContent)
 * getParagraphWithText(matchContent)
 * getParagraphWithHeading(matchHeading)
 * headingLevelLarger(heading)
 * headingLevelSmaller(heading)
 */

const HeadingLevels = [
    DocumentApp.ParagraphHeading.TITLE,
    DocumentApp.ParagraphHeading.SUBTITLE,
    DocumentApp.ParagraphHeading.HEADING1,
    DocumentApp.ParagraphHeading.HEADING2,
    DocumentApp.ParagraphHeading.HEADING3,
    DocumentApp.ParagraphHeading.HEADING4,
    DocumentApp.ParagraphHeading.HEADING5,
    DocumentApp.ParagraphHeading.HEADING6,
    DocumentApp.ParagraphHeading.NORMAL
]

function insertDailyLogEntry() {
    DailyLogLibrary.insertTodaysDailyHeaderListAndMonth(DocumentApp.ParagraphHeading.HEADING1, "Log");
}

/**
 * Inserts a Date Header (daysFromNow), with empty List and a possible Month, at the point after matching Heading/Content
 */
function insertTodaysDailyHeaderListAndMonth(matchHeading, matchContent) {
    return insertFutureDailyHeaderListAndMonth(0, matchHeading, matchContent);
}

/**
 * Inserts a Date Header (daysFromNow), with empty List and a possible Month, at the point after matching Heading/Content
 */
function insertFutureDailyHeaderListAndMonth(daysFromNow, matchHeading, matchContent) {
    var heading = insertFutureDailyHeaderAndList(daysFromNow, matchHeading, matchContent);
    if (isDifferentMonth(daysFromNow + 1)) {
        insertTodaysMonthHeader(matchHeading, matchContent);
    }
    return heading;
}

/**
 * Inserts a Month Header, at the point after matching Heading/Content
 */
function insertTodaysMonthHeader(matchHeading, matchContent) {
    return insertFutureMonthHeader(0, matchHeading, matchContent)
}

/**
 * Inserts a Futute Month Header, at the point after matching Heading/Content
 */
function insertFutureMonthHeader(daysFromNow, matchHeading, matchContent) {
    var date = getDaysFromNowDate(daysFromNow)
    var content = formatMonth(date);

    var heading = getParagraphMatchingHeadingWithContent(matchHeading, matchContent);
    var newParagraph = insertParagraphAfter(heading, content);
    formatHeader(newParagraph, headingLevelSmaller(matchHeading));

    return newParagraph;
}

/**
 * Get the date, days from now in the future.
 */
function getDaysFromNowDate(daysFromNow) {
    var date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date;
}

/**
 * Get the date, days from now in the future.
 */
function isDifferentMonth(daysFromNow) {
    var date = new Date();
    var futureDate = getDaysFromNowDate(daysFromNow);
    console.log(date + " / " + futureDate);
    return date.getMonth() !== futureDate.getMonth();
}

/**
 * Inserts a Date Header, with empty list at the point after matching Heading/Content
 */
function insertTodaysDailyHeaderAndList(matchHeading, matchContent) {
    return insertFutureDailyHeaderAndList(0, matchHeading, matchContent);
}

/**
 * Inserts a Date Header (daysFromNow), with empty list at the point after matching Heading/Content
 */
function insertFutureDailyHeaderAndList(daysFromNow, matchHeading, matchContent) {
    newParagraph = insertFutureDailyHeader(daysFromNow, matchHeading, matchContent);
    var list = insertListAfter(newParagraph, "");
    formatListItem(list);

    return newParagraph;
}

/**
 * Inserts a Date Header, at the point after matching Heading/Content
 */
function insertTodaysDailyHeader(matchHeading, matchContent) {
    return insertFutureDailyHeader(0, matchHeading, matchContent);
}

/**
 * Inserts a Date Header (daysFromNow), at the point after matching Heading/Content
 */
function insertFutureDailyHeader(daysFromNow, matchHeading, matchContent) {
    var date = getDaysFromNowDate(daysFromNow)
    var content = formatDate(date);

    var heading = getParagraphMatchingHeadingWithContent(matchHeading, matchContent);
    var newParagraph = insertParagraphAfter(heading, content);
    formatHeader(newParagraph, headingLevelSmaller(headingLevelSmaller(matchHeading)));

    return newParagraph;
}

/**
 * Formats a Date Header, with headingStyle
 */
function formatHeader(header, headingStyle) {
    header.setHeading(headingStyle);
}

/**
 * Formats a Date Header, with headingStyle
 */
function formatListItem(list) {
    formatListItemLevelAndGlyph(list, 5, DocumentApp.GlyphType.SQUARE_BULLET);
    formatListItemLevelAndGlyph(list, 4, DocumentApp.GlyphType.HOLLOW_BULLET);
    formatListItemLevelAndGlyph(list, 3, DocumentApp.GlyphType.BULLET);
    formatListItemLevelAndGlyph(list, 2, DocumentApp.GlyphType.SQUARE_BULLET);
    formatListItemLevelAndGlyph(list, 1, DocumentApp.GlyphType.HOLLOW_BULLET);
    formatListItemLevelAndGlyph(list, 0, DocumentApp.GlyphType.BULLET);
}

/**
 * Formats a Date Header, with headingStyle
 */
function formatListItemLevelAndGlyph(list, level, glyph) {
    list.setNestingLevel(level).setGlyphType(glyph);
}

/**
 * Returns the date string formatted to yyyy-MM-dd (EEEE)
 */
function formatDate(date) {
    var userTimeZone = CalendarApp.getDefaultCalendar().getTimeZone();
    return Utilities.formatDate(date, userTimeZone, "yyyy-MM-dd (EEEE)");
}

/**
 * Returns the month string formatted to MMMM
 */
function formatMonth(date) {
    var userTimeZone = CalendarApp.getDefaultCalendar().getTimeZone();
    return Utilities.formatDate(date, userTimeZone, "MMMM");
}

/**
 * Returns the first Paragraph that matches both the given heading level and content
 */
function insertParagraphAfter(insertionAfterParagraph, contentToInsert) {
    var doc = DocumentApp.getActiveDocument();
    var body = doc.getBody();
    var headingIndex = body.getChildIndex(insertionAfterParagraph);
    return body.insertParagraph(headingIndex + 1, contentToInsert);
}

/**
 * Returns the first Paragraph that matches both the given heading level and content
 */
function insertListAfter(insertionAfterParagraph, contentToInsert) {
    var doc = DocumentApp.getActiveDocument();
    var body = doc.getBody();
    var headingIndex = body.getChildIndex(insertionAfterParagraph);
    return body.insertListItem(headingIndex + 1, contentToInsert);
}

/**
 * Returns the first Paragraph that matches both the given heading level and content
 */
function getParagraphMatchingHeadingWithContent(matchHeading, matchContent) {
    var doc = DocumentApp.getActiveDocument();
    var body = doc.getBody();
    var paragraphs = body.getParagraphs();
    for (var i = 0; i < paragraphs.length; i++) {
        var paragraph = paragraphs[i];
        var paragraphHeading = paragraph.getHeading();
        if (matchHeading === paragraphHeading) {
            var paragraphContent = paragraph.getText();
            if (matchContent === paragraphContent) {
                return paragraph;
            }
        }
    }
    return null;
}

/**
 * Returns the first Paragraph that matches the given content
 */
function getParagraphWithText(matchContent) {
    var doc = DocumentApp.getActiveDocument();
    var body = doc.getBody();
    var paragraphs = body.getParagraphs();
    for (var i = 0; i < paragraphs.length; i++) {
        var paragraph = paragraphs[i];
        var paragraphContent = paragraph.getText();
        if (matchContent === paragraphContent) {
            return paragraph;
        }
    }
    return null;
}

/**
 * Returns the first Paragraph that matches the given heading level
 */
function getParagraphWithHeading(matchHeading) {
    var doc = DocumentApp.getActiveDocument();
    var body = doc.getBody();
    var paragraphs = body.getParagraphs();
    for (var i = 0; i < paragraphs.length; i++) {
        var paragraph = paragraphs[i];
        var paragraphHeading = paragraph.getHeading();
        if (matchHeading === paragraphHeading) {
            return paragraph;
        }
    }
    return null;
}

/**
 * Takes a heading level and returns the next Larger Level
 */
function headingLevelLarger(heading) {
    var headingIndex = HeadingLevels.indexOf(heading);
    headingIndex = headingIndex > 0 ? headingIndex - 1 : headingIndex;
    return HeadingLevels[headingIndex];
}

/**
 * Takes a heading level and returns the next Smaller Level
 */
function headingLevelSmaller(heading) {
    var headingIndex = HeadingLevels.indexOf(heading);
    headingIndex = headingIndex < HeadingLevels.length - 1 ? headingIndex + 1 : headingIndex;
    return HeadingLevels[headingIndex];
}
