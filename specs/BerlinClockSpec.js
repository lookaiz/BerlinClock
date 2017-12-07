describe("BerlinClock", function(){
	
	beforeEach(function() {
		this.clock = new BerlinClock();
	});

	describe('error cases', function() {
		it('null time', function() {
			expect(this.clock.setTime.bind(this.clock, null)).toThrowError(Error);
		});

		it('empty time', function() {
			expect(this.clock.setTime.bind(this.clock, "")).toThrowError(Error);
		});

		it('invalid hour value', function() {
			expect(this.clock.setTime.bind(this.clock, "AA:13:56")).toThrowError(Error);
		});

		it('invalid minute value', function() {
			expect(this.clock.setTime.bind(this.clock, "02:F:53")).toThrowError(Error);
		});

		it('invalid second value', function() {
			expect(this.clock.setTime.bind(this.clock, "09:21:%")).toThrowError(Error);
		});

		it('only one field', function() {
			expect(this.clock.setTime.bind(this.clock, "18")).toThrowError(Error);
		});

		it('too many fields', function() {
			expect(this.clock.setTime.bind(this.clock, "17:13:14:16")).toThrowError(Error);
		});

		it('hour > 23', function() {
			expect(this.clock.setTime.bind(this.clock, "30:22:14")).toThrowError(Error);
		});

		it('minutes > 59', function() {
			expect(this.clock.setTime.bind(this.clock, "12:77:14")).toThrowError(Error);
		});

		it('seconds > 59', function() {
			expect(this.clock.setTime.bind(this.clock, "12:22:65")).toThrowError(Error);
		});

	});

	describe('seconds', function() {
		it('odd seconds', function() {
			this.clock.setTime("23:42:59");
			expect(this.clock.getSeconds()).toEqual('Y');
		});

		it('even seconds', function() {
			this.clock.setTime("23:42:58");
			expect(this.clock.getSeconds()).toEqual('O');
		});
	});

	describe('five-hours', function() {
		it('00:00:00', function() {
			this.clock.setTime("00:00:00");
			expect(this.clock.getFiveHoursRow()).toEqual(['O', 'O', 'O', 'O']);
		});

		it('23:59:59', function() {
			this.clock.setTime("23:59:59");
			expect(this.clock.getFiveHoursRow()).toEqual(['R', 'R', 'R', 'R']);
		});

		it('02:04:00', function() {
			this.clock.setTime("02:04:00");
			expect(this.clock.getFiveHoursRow()).toEqual(['O', 'O', 'O', 'O']);
		});

		it('08:23:00', function() {
			this.clock.setTime("08:23:00");
			expect(this.clock.getFiveHoursRow()).toEqual(['R', 'O', 'O', 'O']);
		});

		it('16:35:00', function() {
			this.clock.setTime("16:35:00");
			expect(this.clock.getFiveHoursRow()).toEqual(['R', 'R', 'R', 'O']);
		});
	});

	describe('one-hours', function() {
		
		it('00:00:00', function() {
			this.clock.setTime("00:00:00");
			expect(this.clock.getOneHoursRow()).toEqual(['O', 'O', 'O', 'O']);
		});

		it('23:59:59', function() {
			this.clock.setTime("23:59:59");
			expect(this.clock.getOneHoursRow()).toEqual(['R', 'R', 'R', 'O']);
		});

		it('02:04:00', function() {
			this.clock.setTime("02:04:00");
			expect(this.clock.getOneHoursRow()).toEqual(['R', 'R', 'O', 'O']);
		});

		it('08:23:00', function() {
			this.clock.setTime("08:23:00");
			expect(this.clock.getOneHoursRow()).toEqual(['R', 'R', 'R', 'O']);
		});

		it('14:35:00', function() {
			this.clock.setTime("14:35:00");
			expect(this.clock.getOneHoursRow()).toEqual(['R', 'R', 'R', 'R']);
		});
	});

	describe('five-minutes', function() {
		
		it('00:00:00', function() {
			this.clock.setTime("00:00:00");
			expect(this.clock.getFiveMinutesRow()).toEqual(['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']);
		});

		it('23:59:59', function() {
			this.clock.setTime("23:59:59");
			expect(this.clock.getFiveMinutesRow()).toEqual(['Y', 'Y', 'R', 'Y', 'Y', 'R', 'Y', 'Y', 'R', 'Y', 'Y']);
		});

		it('12:04:00', function() {
			this.clock.setTime("12:04:00");
			expect(this.clock.getFiveMinutesRow()).toEqual(['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']);
		});

		it('12:23:00', function() {
			this.clock.setTime("12:23:00");
			expect(this.clock.getFiveMinutesRow()).toEqual(['Y', 'Y', 'R', 'Y', 'O', 'O', 'O', 'O', 'O', 'O', 'O']);
		});

		it('12:35:00', function() {
			this.clock.setTime("12:35:00");
			expect(this.clock.getFiveMinutesRow()).toEqual(['Y', 'Y', 'R', 'Y', 'Y', 'R', 'Y', 'O', 'O', 'O', 'O']);
		});
	});

});
