namespace AppointmentsManager.Controllers
{
    [Route("api/appointment")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/appointment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            if (_context.Appointments == null) return NotFound("No Data Found!");

            return await _context.Appointments.Where(e => !e.Deleted && !e.Done).ToListAsync();
        }

        // GET: api/Appointment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            if (_context.Appointments == null) return NotFound("No Data Found!");

            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null) return NotFound("No Data Found!");

            return appointment;
        }

        [HttpPost("filters")]
        public async Task<ActionResult<IEnumerable<Appointment>>> FilteredAppointments(Filter filters)
        {
            if (_context.Appointments == null) return NotFound("No Data Found!");

            List<Appointment> allData = await _context.Appointments.ToListAsync();

            if (filters.All) return allData;

            if (filters.LevelOfImportance != null)
                allData = allData.Where(e => e.LevelOfImportance == filters.LevelOfImportance).ToList();

            if (filters.SpecifiedDate != null)
                allData = allData.Where(e => e.Date == filters.SpecifiedDate).ToList();

            if (filters.StartDate != null && filters.EndDate != null)
                allData = allData.Where(e => e.Date >= filters.StartDate && e.Date <= filters.EndDate).ToList();

            if (filters.SpecifiedTime != null)
                allData = allData.Where(e => e.Time == filters.SpecifiedTime).ToList();


            allData = allData.Where(e => e.Done == filters.Done).ToList();
            allData = allData.Where(e => e.Deleted == filters.Deleted).ToList();

            return allData;
        }

        // PUT: api/Appointment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
        {
            if (id != appointment.ID) return BadRequest("You are trying to modify the wrong appointment.");

            try
            {
                Appointment entry = await _context.Appointments.FirstAsync(e => e.ID == appointment.ID);

                if (entry.Title != appointment.Title) entry.Title = appointment.Title;
                if (entry.Description != appointment.Description) entry.Description = appointment.Description;
                if (entry.Adress != appointment.Adress) entry.Adress = appointment.Adress;
                if (entry.LevelOfImportance != appointment.LevelOfImportance) entry.LevelOfImportance = appointment.LevelOfImportance;
                if (entry.Done != appointment.Done) entry.Done = appointment.Done;
                if (entry.Deleted != appointment.Deleted) entry.Deleted = appointment.Deleted;
                if (entry.Date != appointment.Date) entry.Date = appointment.Date;
                if (entry.Time != appointment.Time) entry.Time = appointment.Time;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppointmentExists(id)) return NotFound($"The appointment with the Id {id} does not exist");
                else throw;
            }

            return Ok("Appointment update successfully!");
        }

        // POST: api/appointment
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            if (_context.Appointments == null) return Problem("Entity set 'Appointments' is null.");

            try
            {
                _context.Appointments.Add(appointment);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException e)
            {
                return BadRequest($"Could not create the new Appointment: {e.Message}");
            }


            return CreatedAtAction("GetAppointment", new { id = appointment.ID }, appointment);
        }

        // DELETE: api/Appointment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            if (_context.Appointments == null) return NotFound("No Data Found!");

            var appointment = await _context.Appointments.FirstAsync(e => e.ID == id);

            if (appointment == null) return NotFound($"No appointment with the ID {id}");

            Appointment entry = await _context.Appointments.FirstAsync(e => e.ID == appointment.ID);
            entry.ModifiedDate = DateTime.Now;
            entry.Deleted = true;
            await _context.SaveChangesAsync();

            return Ok("Appointment deleted successfully!");
        }

        private bool AppointmentExists(int id)
        {
            return (_context.Appointments?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
