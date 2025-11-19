---
title: "Importing Subscribers"
description: "Detailed guide to importing subscribers from CSV files and GryphLife into ClubMail."
---

# Importing Subscribers

This guide provides detailed instructions for importing subscribers into ClubMail from CSV files or GryphLife.

<!-- TODO: Add screenshot of import interface -->

## CSV Import

### Preparing Your CSV File

Your CSV file should have the following structure:

**Required Column:**
- `email` - Subscriber's email address (required)

**Optional Columns:**
- `name` - Subscriber's full name
- Any other columns become custom fields

**Example CSV:**
```csv
email,name,membershipType,graduationYear,program
john@example.com,John Doe,Premium,2025,Computer Science
jane@example.com,Jane Smith,Standard,2024,Engineering
bob@example.com,Bob Johnson,Basic,2026,Business
```

### CSV Format Requirements

- **First Row:** Must contain column headers
- **Encoding:** UTF-8 recommended
- **Separator:** Comma (`,`)
- **Quotes:** Use quotes for values containing commas
- **Email Format:** Must be valid email addresses

### Importing from CSV

1. Navigate to your club's Subscribers page
2. Select the target email list from the dropdown
3. Click "Import CSV" button
4. You have two options:
   - **Paste CSV:** Copy and paste your CSV content into the text area
   - **Upload File:** Click to upload a CSV file (if supported)
5. Review the parsed data preview
6. Verify:
   - Correct number of subscribers detected
   - Column headers are recognized
   - Data looks correct
7. Select the target email list (if not already selected)
8. Click "Import" to complete

<!-- TODO: Add screenshot of CSV import preview -->

### Import Results

After importing, you'll see a summary:

- **Created** - New subscribers added
- **Updated** - Existing subscribers updated
- **Skipped** - Subscribers that couldn't be imported (with reasons)
- **Errors** - Any errors encountered

### Handling Duplicates

- If an email already exists for the club, the subscriber is **updated** (not duplicated)
- Existing custom fields are merged with new data
- List memberships are added (not replaced)

## GryphLife Import

### Preparing GryphLife Data

1. Export your data from GryphLife
2. Copy the exported data
3. Ensure the data includes email addresses

### Importing from GryphLife

1. Navigate to your club's Subscribers page
2. Select the target email list from the dropdown
3. Click "Import from GryphLife" button
4. Paste the GryphLife export data into the text area
5. Review the parsed subscriber information
6. Verify:
   - Correct subscribers detected
   - Email addresses are valid
   - Names are correct (if included)
7. Select the target email list (if not already selected)
8. Click "Import" to complete

<!-- TODO: Add screenshot of GryphLife import -->

### GryphLife Data Format

The system automatically parses GryphLife's export format. Supported fields:

- Email addresses
- Names (if available)
- Other subscriber information (if available)

## Custom Fields

### Automatic Custom Fields

Any columns in your CSV (besides `email` and `name`) automatically become custom fields:

**CSV:**
```csv
email,name,membershipType,graduationYear
john@example.com,John Doe,Premium,2025
```

**Result:**
- Subscriber with email `john@example.com`
- Name: `John Doe`
- Custom fields:
  - `membershipType: "Premium"`
  - `graduationYear: "2025"`

### Using Custom Fields

After import, custom fields can be used in email placeholders:

```
{{.CustomFields.membershipType}}
{{.CustomFields.graduationYear}}
```

See [Variable Placeholders](/features/variables) for complete documentation.

### Nested Custom Fields

For complex data, you can structure custom fields as JSON in your CSV (advanced):

**Note:** This requires manual JSON formatting in your CSV file.

## Best Practices

### Data Preparation

- **Clean Your Data:** Remove invalid email addresses before importing
- **Standardize Format:** Use consistent formatting for names and fields
- **Test First:** Import a small sample first to verify format
- **Backup:** Keep a copy of your original data

### Email List Selection

- **Choose Target List:** Select the appropriate list before importing
- **Create Lists First:** Set up email lists before importing
- **Default List:** Consider using the default list for general imports

### Import Strategy

- **Small Batches:** Import in manageable chunks (100-500 at a time)
- **Verify Results:** Check import summary after each batch
- **Handle Errors:** Review skipped/error items and fix data
- **Update Existing:** Understand that duplicates update existing subscribers

### Data Quality

- **Valid Emails:** Ensure all email addresses are valid
- **No Duplicates:** System handles duplicates, but clean data is better
- **Consistent Fields:** Use consistent values for custom fields
- **Required Fields:** Only email is required; other fields are optional

## Troubleshooting

### Import Fails

**Check:**
- CSV format is correct
- First row contains headers
- Email addresses are valid
- File encoding is UTF-8
- No special characters causing issues

### Wrong Data Parsed

**Solutions:**
- Verify column headers match expected format
- Check for extra commas or quotes in data
- Ensure CSV separator is comma
- Review data preview before importing

### Duplicate Subscribers

**Understanding:**
- System updates existing subscribers (doesn't create duplicates)
- This is expected behavior
- Existing custom fields are merged
- List memberships are added

**If You Want New Subscribers:**
- Ensure emails don't already exist in the club
- Or create a new club for separate data

### Custom Fields Not Appearing

**Check:**
- Column headers are correct
- Data is in the CSV file
- Import completed successfully
- View subscriber details to see custom fields

### GryphLife Import Issues

**Solutions:**
- Verify GryphLife export format
- Check that data includes email addresses
- Try exporting again from GryphLife
- Contact support if format has changed

## After Import

### Verify Import

1. Check subscriber count matches expected
2. Review a few subscribers to verify data
3. Check custom fields are populated
4. Verify list memberships are correct

### Next Steps

- [Managing Subscribers](/user-guide/managing-subscribers) - Edit and organize subscribers
- [Creating Campaigns](/user-guide/creating-campaigns) - Send emails to imported subscribers
- [Variable Placeholders](/features/variables) - Use custom fields in campaigns

## Related Guides

- [Managing Subscribers](/user-guide/managing-subscribers) - Complete subscriber management guide
- [Variable Placeholders](/features/variables) - Using custom fields in emails

