# Run 
`npm run start`

# Algorithm
I have used the core algorithm with 
custom weights for bulgarian

Weights:
'а', 'я', 'о', 'у','и', 'е', 'ъ': 0;
Based on the core algorithm and common 
problems in bulgarian. 
а - ъ
о - у
е - и
'я' changes to 'e' and to 'а'
 
'б', 'п': 1; common familiar sound
'в', 'ф': 2; common familiar sound
'д', 'т': 3; common familiar sound
'м', 'н': 4; this works sometimes sometimes it doesn't
'г''к': 5; this works sometimes sometimes it doesn't
'з','с': 6; common familiar sound
'л', 'р', 'х', 'ц', 'ч', 'щ', 'ш','ж': 7: this are not based 
on familiarity, they are just letters without group. 
it creates result that doesnt make sense. 
The group is meant to split, but it wait its way
'ю', 'й', 'ь': 8: I have put them i separate group
because the transcription is made from both of these
letters and 'y', but using it as 'я' it will probably 
not work since 'я' can become easiliy more like 'a' and
often changes to 'е', but 'ю' doesnt change to 'у' 
and doesnt go the other letters. The rule actually 
looks promising.

# Core Algorithm
The other part of the algorithm are the same
- put first letter at begging
- remove zeroes
- remove groups of numbers '776' to become '76'
- add traling zeroes if code is less than 4 letter: 'ю7' to become 'ю700'

# TODO:
- Confirm results
- Split group: 'л', 'р', 'х', 'ц', 'ч', 'щ', 'ш','ж'
- Test with another dataset
- Remove name combination example: "Мария-Вероника"
- (Idea) Test with transcriptions
Example:
ц -> тс
щ -> шт

